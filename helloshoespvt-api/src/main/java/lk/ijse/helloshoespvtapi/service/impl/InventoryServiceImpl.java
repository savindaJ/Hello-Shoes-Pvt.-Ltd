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
        map.setSupplierName(map.getSupplier().getSupplierName());
        map.setItemCode(IDGenerator.generateItemCode(inventoryDTO.getItemGender(),inventoryDTO.getItemType(),inventoryDTO.getItemDescription()));
        inventoryRepo.save(map);
        return true;
    }

    @Override
    public List<InventoryDTO> getAvailableInventory() {
        return inventoryRepo.findAllByItemStatus(ItemStatus.AVAILABLE).stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepo.findAll().stream().map(inventory -> modelMapper.map(inventory, InventoryDTO.class)).toList();
    }
}
