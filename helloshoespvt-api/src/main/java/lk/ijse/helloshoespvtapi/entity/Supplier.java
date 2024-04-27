package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.embedded.Contact;
import lk.ijse.helloshoespvtapi.enums.SupplierCategory;
import lombok.*;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    private String supplierCode;
    private String supplierName;
    @Enumerated(EnumType.STRING)
    private SupplierCategory supplierCategory;
    private Contact contact;
    private String email;
    private Boolean isActive;
    private Address address;
    private String originCountry;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<Inventory> inventories;
}
