package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Repository
public interface BranchRepo extends JpaRepository<Branch, String> {
}
