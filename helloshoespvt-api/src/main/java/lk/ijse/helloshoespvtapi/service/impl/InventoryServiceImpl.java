package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.InventoryDTO;
import lk.ijse.helloshoespvtapi.entity.Inventory;
import lk.ijse.helloshoespvtapi.enums.ItemStatus;
import lk.ijse.helloshoespvtapi.repo.InventoryRepo;
import lk.ijse.helloshoespvtapi.repo.SupplierRepo;
import lk.ijse.helloshoespvtapi.service.InventoryService;
import lk.ijse.helloshoespvtapi.service.UploadService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepo inventoryRepo;

    private final ModelMapper modelMapper;

    private final UploadService uploadService;

    private final SupplierRepo supplierRepo;

    public InventoryServiceImpl(InventoryRepo inventoryRepo, ModelMapper modelMapper, UploadService uploadService, SupplierRepo supplierRepo) {
        this.inventoryRepo = inventoryRepo;
        this.modelMapper = modelMapper;
        this.uploadService = uploadService;
        this.supplierRepo = supplierRepo;
    }

    @Override
    public boolean saveInventory(InventoryDTO inventoryDTO, MultipartFile file) throws IOException {
        String image = uploadService.uploadFile(file);
        Inventory map = modelMapper.map(inventoryDTO, Inventory.class);
        map.setSupplier(supplierRepo.findById(inventoryDTO.getSupplierId()).get());
        map.setItemPicture(image);
        map.setDiscount(inventoryDTO.getDiscount() == null ? 0 : inventoryDTO.getDiscount());
        map.setItemSoldCount(0);
        map.setGetStockTotal(inventoryDTO.getQtyOnHand());
        map.setSupplierName(map.getSupplier().getSupplierName());
        map.setItemCode(IDGenerator.generateItemCode(inventoryDTO.getItemGender(), inventoryDTO.getItemType(), inventoryDTO.getItemDescription()));
        inventoryRepo.save(map);
        return true;
    }

    @Override
    public List<InventoryDTO> getAvailableInventory() {
        return inventoryRepo.findAllByItemStatusNot(ItemStatus.NOT_AVAILABLE).stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepo.findAll().stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }

    @Override
    public InventoryDTO getInventory(String itemCode) {
        return modelMapper.map(inventoryRepo.findById(itemCode).get(), InventoryDTO.class);
    }

    @Override
    public boolean updateInventory(InventoryDTO inventoryDTO, MultipartFile file) throws IOException {
        Inventory inventory = inventoryRepo.findById(inventoryDTO.getItemCode()).get();
        inventory.setSupplier(supplierRepo.findById(inventoryDTO.getSupplierId()).get());
        inventory.setSupplierName(inventory.getSupplier().getSupplierName());
        inventory.setSize(inventoryDTO.getSize());
        inventory.setQtyOnHand(inventoryDTO.getQtyOnHand());
        inventory.setSellingPrice(inventoryDTO.getSellingPrice());
        inventory.setItemDescription(inventoryDTO.getItemDescription());
        inventory.setItemGender(inventoryDTO.getItemGender());
        inventory.setItemType(inventoryDTO.getItemType());
        inventory.setBrand(inventoryDTO.getBrand());
        inventory.setBuyingPrice(inventoryDTO.getBuyingPrice());
        inventory.setDiscount(inventoryDTO.getDiscount());
        inventory.setExpectedProfit(inventoryDTO.getExpectedProfit());
        inventory.setProfitMargin(inventoryDTO.getProfitMargin());
        inventory.setItemStatus(inventoryDTO.getItemStatus());
        inventory.setGetStockTotal(inventoryDTO.getQtyOnHand());
        if (!file.getOriginalFilename().equals("notUpdate")) {
            String image = uploadService.uploadFile(file);
            inventory.setItemPicture(image);
        }
        inventoryRepo.save(inventory);
        return true;
    }

    @Override
    public List<String> getBrands() {
        return inventoryRepo.getBrands();
    }

    @Override
    public List<InventoryDTO> getAvailableBrandItems(String brand) {
        return inventoryRepo.findAllByBrandAndItemStatusNot(brand, ItemStatus.NOT_AVAILABLE).stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }
}
