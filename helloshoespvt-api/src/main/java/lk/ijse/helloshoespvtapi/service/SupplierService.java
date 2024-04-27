package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.SupplierDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
public interface SupplierService {
    boolean saveSupplier(SupplierDTO supplierDTO);

    List<SupplierDTO> getAllSuppliers();

    SupplierDTO getSupplier(String id);

    boolean updateSupplier(SupplierDTO supplierDTO);

    boolean deleteSupplier(String id);

    List<String> getSupplierId();
}
