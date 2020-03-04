package blackcv.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link blackcv.domain.StaffOrigin} entity.
 */
public class StaffOriginDTO implements Serializable {

    private Long id;

    private String name;

    private String email;

    private String job;

    private String advantages;

    private String defect;

    private String more;

    private String from;

    private String to;

    private Integer status;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getAdvantages() {
        return advantages;
    }

    public void setAdvantages(String advantages) {
        this.advantages = advantages;
    }

    public String getDefect() {
        return defect;
    }

    public void setDefect(String defect) {
        this.defect = defect;
    }

    public String getMore() {
        return more;
    }

    public void setMore(String more) {
        this.more = more;
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

        StaffOriginDTO staffOriginDTO = (StaffOriginDTO) o;
        if (staffOriginDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staffOriginDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StaffOriginDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", job='" + getJob() + "'" +
            ", advantages='" + getAdvantages() + "'" +
            ", defect='" + getDefect() + "'" +
            ", more='" + getMore() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
