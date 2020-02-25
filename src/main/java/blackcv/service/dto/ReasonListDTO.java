package blackcv.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link blackcv.domain.ReasonList} entity.
 */
public class ReasonListDTO implements Serializable {

    private Long id;

    private Integer idCV;

    private String document;

    private Integer id_reason;

    private Integer status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCV() {
        return idCV;
    }

    public void setIdCV(Integer idCV) {
        this.idCV = idCV;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public Integer getId_reason() {
        return id_reason;
    }

    public void setId_reason(Integer id_reason) {
        this.id_reason = id_reason;
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

        ReasonListDTO reasonListDTO = (ReasonListDTO) o;
        if (reasonListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reasonListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReasonListDTO{" +
            "id=" + getId() +
            ", idCV=" + getIdCV() +
            ", document='" + getDocument() + "'" +
            ", id_reason=" + getId_reason() +
            ", status=" + getStatus() +
            "}";
    }
}
