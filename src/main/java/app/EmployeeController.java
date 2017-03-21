package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import app.Employee;
import app.EmployeeRepository;
import app.Review;
import app.ReviewRepository;

@Controller
@RequestMapping(path="employees")
public class EmployeeController {
    @Autowired

    private EmployeeRepository EmployeeRepository;

    @Autowired
    private ReviewRepository ReviewRepository;

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody Employee addNewEmployee (@RequestParam String name) {

        Employee n = new Employee();
        n.setName(name);
        EmployeeRepository.save(n);
        return n;
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/update") // Map ONLY GET Requests
    public @ResponseBody Iterable<Employee> updateNewEmployee (@RequestParam Integer id,
             @RequestParam(value = "name", required=false) String name,
             @RequestParam(value = "reviewId", required=false) Integer reviewId) {

        Employee n = EmployeeRepository.findOne(id);

        if(name == null) {
            name = n.getName();
        }

        n.setName(name);

        EmployeeRepository.save(n);

        return this.getAllEmployees();
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        return EmployeeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/employee")
    public @ResponseBody Employee getEmployee(@RequestParam Integer employeeId) {
        Employee e = EmployeeRepository.findOne(employeeId);
        return e;
    }

    @CrossOrigin(origins = "http://localhost:9010")
    @GetMapping(path="/delete")
    public @ResponseBody Iterable<Employee> deleteEmployee(@RequestParam Integer employeeId) {
        EmployeeRepository.delete(employeeId);
        return this.getAllEmployees();
    }
}