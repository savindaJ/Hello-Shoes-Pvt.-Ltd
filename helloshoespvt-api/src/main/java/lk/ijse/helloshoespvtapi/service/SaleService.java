package lk.ijse.helloshoespvtapi.service;

import lk.ijse.helloshoespvtapi.dto.RefundDTO;
import lk.ijse.helloshoespvtapi.dto.SaleDTO;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 5/6/2024
 * @since : 0.1.0
 **/
public interface SaleService {
    boolean saveSale(SaleDTO saleDTO);

    List<RefundDTO> getCanRefundItems();

    Double getTotalOfSale();
}
