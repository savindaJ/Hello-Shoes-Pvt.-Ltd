package lk.ijse.helloshoespvtapi.repo;

import lk.ijse.helloshoespvtapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Repository
public interface UserRepo extends JpaRepository<User, String> {
}
