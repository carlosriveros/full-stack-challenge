package app;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.Set;

import app.Review;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;


    @ManyToMany(mappedBy = "assignedReviewers")
    private Set<Review> assignedReviews;


    // Serialize as a single value with the field "id"
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

    // Serialize as told by @JsonIdentityInfo immediately (if false -> on second and further occurrences)
    @JsonIdentityReference(alwaysAsId = true)

    // Rename to "review_id" (would be "review" otherwise)
    @JsonProperty(value = "review_id")

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reviewee")
    private Review review;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Set<Review> getAssignedReviews() {
        return assignedReviews;
    }

    public void setAssignedReviews(Set<Review> assignedReviews) {
        this.assignedReviews = assignedReviews;

    }
}