package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.enums.ItemGender;
import lk.ijse.helloshoespvtapi.enums.ItemStatus;
import lk.ijse.helloshoespvtapi.enums.ItemType;
import lombok.*;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
    @Id
    private String itemCode;
    private String itemDescription;
    private String itemPicture;
    private Integer qtyOnHand;
    private Integer size;
    private Integer discount;
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
    @Enumerated(EnumType.STRING)
    private ItemGender itemGender;
    private Double buyingPrice;
    private String brand;
    private Double sellingPrice;
    private Double expectedProfit;
    private Double profitMargin;
    @Enumerated(EnumType.STRING)
    private ItemStatus itemStatus;
    private String supplierName;

    @ManyToOne(cascade = CascadeType.ALL)
    private Supplier supplier;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "sale_inventory_detail",
            joinColumns = @JoinColumn(name = "item_code"),
            inverseJoinColumns = @JoinColumn(name = "sale_id"))
    private List<Sale> sales;
}
