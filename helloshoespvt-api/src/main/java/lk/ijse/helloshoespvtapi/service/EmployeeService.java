package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.EmployeeDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
public interface EmployeeService {
    boolean saveEmployee(EmployeeDTO employee, MultipartFile file) throws IOException;
}
