package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * @author : savindaJ
 * @date : 5/19/2024
 * @since : 0.1.0
 **/
@Getter
@Setter
@Entity
@Table(name = "sale_inventory")
public class SaleInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @Column(nullable = false)
    private int quantity;
}
