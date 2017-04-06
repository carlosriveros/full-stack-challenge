package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import app.Review;
import app.ReviewRepository;
import app.Employee;
import app.EmployeeRepository;

import java.util.Set;

@Controller
@RequestMapping(path="reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository ReviewRepository;

    @Autowired
    private EmployeeRepository EmployeeRepository;

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/add")
    public @ResponseBody Review addNewReview (@RequestParam Integer revieweeId) {

        Employee reviewee = EmployeeRepository.findOne(revieweeId);

        Review n = new Review();
        n.setBody("To Be Completed");
        n.setCompleted("N");
        n.setReviewee(reviewee);
        ReviewRepository.save(n);

        reviewee.setReview(n);
        EmployeeRepository.save(reviewee);

        return n;
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/update")
    public @ResponseBody Iterable<Review> updateReview(@RequestParam Integer id, @RequestParam(value = "body", required=false) String body,
                                              @RequestParam(value = "completed", required=false) String completed,
                                              @RequestParam(value = "revieweeId", required=false) Integer revieweeId, @RequestParam(value = "reviewerId", required=false) Integer reviewerId) {


        Employee reviewee = null;
        Employee reviewer = null;

        Review n = ReviewRepository.findOne(id);

        if(body == null) {
            body = n.getBody();
        }

        if(completed == null) {
            completed = n.getCompleted();
        }

        n.setBody(body);
        n.setCompleted(completed);

        if(revieweeId != null) {
            reviewee = EmployeeRepository.findOne(revieweeId);
            n.setReviewee(reviewee);
        }

        if(reviewerId != null) {
            reviewer = EmployeeRepository.findOne(reviewerId);
            Set<Employee> assignedReviewers = n.getAssignedReviewers();
            assignedReviewers.add(reviewer);
            ReviewRepository.save(n);
        }

        if(revieweeId != null) {
            reviewee.setReview(n);
            EmployeeRepository.save(reviewee);
        }

        if(reviewerId != null) {
            Set<Review> assignedReviews = reviewer.getAssignedReviews();
            assignedReviews.add(n);
            reviewer.setAssignedReviews(assignedReviews);
            EmployeeRepository.save(reviewer);
        }

        ReviewRepository.save(n);

        return this.getAllReviews();
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/")
    public @ResponseBody Iterable<Review> getAllReviews() {
        return ReviewRepository.findAll();
    }
}