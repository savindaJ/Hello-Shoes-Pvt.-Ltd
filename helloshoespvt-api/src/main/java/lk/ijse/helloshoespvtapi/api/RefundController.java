package lk.ijse.helloshoespvtapi.api;

import lk.ijse.helloshoespvtapi.dto.RefundDTO;
import lk.ijse.helloshoespvtapi.dto.RefundRequestDTO;
import lk.ijse.helloshoespvtapi.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/refund")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;

    @PostMapping
    public ResponseEntity<?> addRefund(@RequestBody RefundRequestDTO refundDTO){
        boolean isRefund = refundService.addRefund(refundDTO);
        return isRefund ? ResponseEntity.ok("Refund Added") : ResponseEntity.ok("Refund Not Added");
    }

    @GetMapping
    public ResponseEntity<?> getAllRefunds(){
        return ResponseEntity.ok(refundService.getAllRefunds());
    }

    @GetMapping
    public ResponseEntity<?> getRefundTotal(){
        return ResponseEntity.ok(refundService.getTotal());
    }
}
