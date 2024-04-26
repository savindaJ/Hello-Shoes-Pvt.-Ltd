package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.UserDto;

/**
 * @author : savindaJ
 * @date : 4/25/2024
 * @since : 0.1.0
 **/
public interface UserDetailService {
    UserDto loginUser(String userName);
}
