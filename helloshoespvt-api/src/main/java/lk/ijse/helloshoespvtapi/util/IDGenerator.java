package lk.ijse.helloshoespvtapi.util;


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
}
