package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Repository
public interface SupplierRepo extends JpaRepository<Supplier, String> {
    List<Supplier> findAllByIsActive(boolean isActive);
}
