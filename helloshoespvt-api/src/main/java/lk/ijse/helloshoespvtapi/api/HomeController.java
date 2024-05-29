package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.HomeDTO;
import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.entity.Customer;
import lk.ijse.helloshoespvtapi.repo.CustomerRepo;
import lk.ijse.helloshoespvtapi.service.EmailService;
import lk.ijse.helloshoespvtapi.service.SaleInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.logging.Logger;

/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HomeController {

    private final SaleInventoryService saleInventoryService;
    private final CustomerRepo customerRepo;
    private final EmailService emailService;
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    @PostMapping
    public HomeDTO getHome(@RequestBody HomeDTO homeDTO) {
        sendWishes();
        logger.info("HomeDTO : " + homeDTO);
        return saleInventoryService.getSaleInventory(homeDTO.getDate());
    }


    @Scheduled(cron = "0 0 8 * * ?")
    private void sendWishes() {
        LocalTime now = LocalTime.now();
        LocalTime targetTime = LocalTime.of(8, 0);

        if (now.getHour() == targetTime.getHour() && now.getMinute() == targetTime.getMinute()) {
            if (!customerRepo.findDob().isEmpty()) {
                new Thread(() -> {
                    for (Customer s : customerRepo.findDob()) {
                        emailService.sendSimpleMessage(s.getEmail(), "Happy Birthday", "Happy Birthday to you :" + s.getCustomerName());
                    }
                }).start();
            }
        }
    }

}
