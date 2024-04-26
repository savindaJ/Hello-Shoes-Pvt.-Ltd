package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Employee;
import lk.ijse.helloshoespvtapi.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String> {
    List<Employee> findAllByRole(Role role);
}
