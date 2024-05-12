package lk.ijse.helloshoespvtapi.service.impl;

import lk.ijse.helloshoespvtapi.dto.SupplierDTO;
import lk.ijse.helloshoespvtapi.entity.Supplier;
import lk.ijse.helloshoespvtapi.repo.SupplierRepo;
import lk.ijse.helloshoespvtapi.service.SupplierService;
import lk.ijse.helloshoespvtapi.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepo supplierRepo;

    private final ModelMapper mapper;

    public SupplierServiceImpl(SupplierRepo supplierRepo, ModelMapper mapper) {
        this.supplierRepo = supplierRepo;
        this.mapper = mapper;
    }

    @Override
    public boolean saveSupplier(SupplierDTO supplierDTO) {
        supplierDTO.setSupplierCode(IDGenerator.generateSupplierId());
        supplierDTO.setIsActive(true);
        Supplier save = supplierRepo.save(mapper.map(supplierDTO, Supplier.class));
        return save != null;
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierRepo.findAllByIsActive(true).stream().map(supplier -> mapper.map(supplier, SupplierDTO.class)).toList();
    }

    @Override
    public SupplierDTO getSupplier(String id) {
        return mapper.map(supplierRepo.findById(id).get(), SupplierDTO.class);
    }

    @Override
    public boolean updateSupplier(SupplierDTO supplierDTO) {
        Supplier supplier = supplierRepo.findById(supplierDTO.getSupplierCode()).get();
        mapper.map(supplierDTO, supplier);
        supplier.setIsActive(true);
        Supplier save = supplierRepo.save(supplier);
        return save != null;
    }

    @Override
    public boolean deleteSupplier(String id) {
        Supplier supplier = supplierRepo.findById(id).get();
        supplier.setIsActive(false);
        Supplier save = supplierRepo.save(supplier);
        return save != null;
    }

    @Override
    public List<String> getSupplierId() {
        return supplierRepo.findAllByIsActive(true).stream().map(Supplier::getSupplierCode).toList();
    }
}
