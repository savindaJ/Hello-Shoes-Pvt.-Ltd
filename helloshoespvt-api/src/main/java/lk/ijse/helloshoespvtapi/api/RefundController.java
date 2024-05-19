package lk.ijse.helloshoespvtapi.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
@RestController
@RequestMapping("/api/v1/refund")
public class RefundController {

    @PostMapping
    public void refund(){
        System.out.println("Refund");
    }
}
