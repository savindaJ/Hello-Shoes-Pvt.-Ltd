package lk.ijse.helloshoespvtapi.util;


import lk.ijse.helloshoespvtapi.enums.ItemGender;
import lk.ijse.helloshoespvtapi.enums.ItemType;

import java.util.UUID;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
public class IDGenerator {
    public static String generateBranchId() {
        String uuid = UUID.randomUUID().toString();
        return "BRAC-"+uuid.substring(0, 8);
    }

    public static String generateSupplierId() {
        String uuid = UUID.randomUUID().toString();
        return "SUP-"+uuid.substring(0, 8);
    }

    public static String generateEmployeeId() {
        String uuid = UUID.randomUUID().toString();
        return "EMP-"+uuid.substring(0, 8);
    }

    public static String generateItemCode(ItemGender itemGender, ItemType itemType, String itemDescription) {
        String uuid = UUID.randomUUID().toString();
        return String.format("%s%s%s-%s",itemType.toString().charAt(0),"S", itemGender.toString().charAt(0), uuid.substring(0, 6));
    }

    public static String generateCustomerId() {
        String uuid = UUID.randomUUID().toString();
        return "CUS-"+uuid.substring(0, 6);
    }
}


