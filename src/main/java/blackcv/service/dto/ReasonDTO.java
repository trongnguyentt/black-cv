package blackcv.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link blackcv.domain.Reason} entity.
 */
public class ReasonDTO implements Serializable {

    private Long id;

    private String descriptons;

    private String reasonName;

    private Integer status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptons() {
        return descriptons;
    }

    public void setDescriptons(String descriptons) {
        this.descriptons = descriptons;
    }

    public String getReasonName() {
        return reasonName;
    }

    public void setReasonName(String reasonName) {
        this.reasonName = reasonName;
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

        ReasonDTO reasonDTO = (ReasonDTO) o;
        if (reasonDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reasonDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReasonDTO{" +
            "id=" + getId() +
            ", descriptons='" + getDescriptons() + "'" +
            ", reasonName='" + getReasonName() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
