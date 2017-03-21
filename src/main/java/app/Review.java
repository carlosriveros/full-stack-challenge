package app;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

//import app.Employee;

@Entity // This tells Hibernate to make a table out of this class
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String body;

    private String completed;


    // Serialize as a single value with the field "id"
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

    // Serialize as told by @JsonIdentityInfo immediately (if false -> on second and further occurrences)
    @JsonIdentityReference(alwaysAsId = true)

    // Rename to "review_id" (would be "review" otherwise)
    @JsonProperty(value = "assignedReviewers")

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "review_employee", joinColumns = @JoinColumn(name = "review_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"))
    private Set<Employee> assignedReviewers;



   @OneToOne(mappedBy = "review")
   private Employee reviewee;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public Employee getReviewee() {
        return reviewee;
    }

    public void setReviewee(Employee reviewee){
        this.reviewee = reviewee;
    }

    public Set<Employee> getAssignedReviewers() {
        return assignedReviewers;
    }

    public void setAssignedReviewers(Set<Employee> assignedReviewers) {
        this.assignedReviewers = assignedReviewers;
    }



}