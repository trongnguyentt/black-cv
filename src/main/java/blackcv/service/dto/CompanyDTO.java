package blackcv.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link blackcv.domain.Company} entity.
 */
public class CompanyDTO implements Serializable {

    private Long id;

    private String name;

    private String businessAreas;

    private String address;

    private Integer status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBusinessAreas() {
        return businessAreas;
    }

    public void setBusinessAreas(String businessAreas) {
        this.businessAreas = businessAreas;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CompanyDTO companyDTO = (CompanyDTO) o;
        if (companyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", businessAreas='" + getBusinessAreas() + "'" +
            ", address='" + getAddress() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
