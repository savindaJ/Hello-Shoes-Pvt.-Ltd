package lk.ijse.helloshoespvtapi.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : savindaJ
 * @date : 5/5/2024
 * @since : 0.1.0
 **/
@RestController
@RequestMapping("/api/v1/sale")
public class SaleController {

    @PostMapping
    public void saveSale(){

    }
}
