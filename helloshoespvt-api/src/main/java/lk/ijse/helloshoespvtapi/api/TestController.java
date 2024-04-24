package lk.ijse.helloshoespvtapi.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : savindaJ
 * @date : 4/24/2024
 * @since : 0.1.0
 **/
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping
    public String test(){
        return "Hello Shoes Pvt API";
    }
}
