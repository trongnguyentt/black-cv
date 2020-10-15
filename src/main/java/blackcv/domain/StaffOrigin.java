package blackcv.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A StaffOrigin.
 */
@Entity
@Table(name = "staff_origin")
public class StaffOrigin extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "job")
    private String job;

    @Column(name = "advantages")
    private String advantages;

    @Column(name = "defect")
    private String defect;

    @Column(name = "more")
    private String more;

    @Column(name = "send_from")
    private String from;

    @Column(name = "send_to")
    private String to;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public StaffOrigin name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public StaffOrigin email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJob() {
        return job;
    }

    public StaffOrigin job(String job) {
        this.job = job;
        return this;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getAdvantages() {
        return advantages;
    }

    public StaffOrigin advantages(String advantages) {
        this.advantages = advantages;
        return this;
    }

    public void setAdvantages(String advantages) {
        this.advantages = advantages;
    }

    public String getDefect() {
        return defect;
    }

    public StaffOrigin defect(String defect) {
        this.defect = defect;
        return this;
    }

    public void setDefect(String defect) {
        this.defect = defect;
    }

    public String getMore() {
        return more;
    }

    public StaffOrigin more(String more) {
        this.more = more;
        return this;
    }

    public void setMore(String more) {
        this.more = more;
    }

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

    public Integer getStatus() {
        return status;
    }

    public StaffOrigin status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StaffOrigin)) {
            return false;
        }
        return id != null && id.equals(((StaffOrigin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StaffOrigin{" +
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
