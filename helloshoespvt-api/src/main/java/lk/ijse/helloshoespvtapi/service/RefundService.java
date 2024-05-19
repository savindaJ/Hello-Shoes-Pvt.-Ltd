package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.RefundRequestDTO;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
public interface RefundService {
    boolean addRefund(RefundRequestDTO refundDTO);
}
