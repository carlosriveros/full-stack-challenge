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

@Controller
@RequestMapping(path="employees")
public class EmployeeController {
    @Autowired

    private EmployeeRepository EmployeeRepository;

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody Employee addNewEmployee (@RequestParam String name
            , @RequestParam String email) {

        Employee n = new Employee();
        n.setName(name);
        n.setEmail(email);
        EmployeeRepository.save(n);
        return n;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        return EmployeeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping(path="/employee")
    public @ResponseBody Employee getEmployee(@RequestParam Integer employeeId) {
        Employee e = EmployeeRepository.findOne(employeeId);
        return e;
    }
}