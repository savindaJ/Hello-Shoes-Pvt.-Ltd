package lk.ijse.helloshoespvtapi.repo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
@SpringBootTest
class SaleInventoryRepoTest {

    @Autowired
    SaleInventoryRepo saleInventoryRepo;

    @Test
    void findBySaleAndInventory() {
    }

    @Test
    void findMaxSaleInventoryByDate() {

    }
}