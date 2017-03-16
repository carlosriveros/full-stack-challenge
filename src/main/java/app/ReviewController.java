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

@Controller
@RequestMapping(path="reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository ReviewRepository;

    @Autowired
    private EmployeeRepository EmployeeRepository;

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/add")
    public @ResponseBody Review addNewReview () {

        Review n = new Review();
        n.setBody("To Be Completed");
        n.setCompleted('N');
        ReviewRepository.save(n);
        return n;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/update")
    public @ResponseBody Review updateReview (@RequestParam Integer reviewId, @RequestParam Integer employeeId
            , @RequestParam String body, @RequestParam char completed) {

        Review n = ReviewRepository.findOne(reviewId);
        Employee e = EmployeeRepository.findOne(employeeId);
        n.setBody(body);
        n.setCompleted(completed);
        n.setRevieweeId(e.getId());
        ReviewRepository.save(n);
        return n;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/")
    public @ResponseBody Iterable<Review> getAllReviews() {
        return ReviewRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/review")
    public @ResponseBody Review getReview(@RequestParam Integer reviewId) {
        Review r = ReviewRepository.findOne(reviewId);
        return r;
    }
}