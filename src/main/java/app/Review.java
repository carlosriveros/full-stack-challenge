package app;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
//import app.Employee;

@Entity // This tells Hibernate to make a table out of this class
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String body;

    private char completed;

   private Integer revieweeId;

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

    public char getCompleted() {
        return completed;
    }

    public void setCompleted(char completed) {
        this.completed = completed;
    }

    public Integer getRevieweeId() {
        return revieweeId;
    }

    public void setRevieweeId (Integer revieweeId) {
        this.revieweeId = revieweeId;
    }


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id")
    public Employee getReviewee() {
        return reviewee;
    }

    public void setReviewee(Employee reviewee){
        this.reviewee = reviewee;
    }





}