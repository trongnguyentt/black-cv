package blackcv.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Reason.
 */
@Entity
@Table(name = "reason")
public class Reason extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descriptons")
    private String descriptons;

    @Column(name = "reason_name")
    private String reasonName;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptons() {
        return descriptons;
    }

    public Reason descriptons(String descriptons) {
        this.descriptons = descriptons;
        return this;
    }

    public void setDescriptons(String descriptons) {
        this.descriptons = descriptons;
    }

    public String getReasonName() {
        return reasonName;
    }

    public Reason reasonName(String reasonName) {
        this.reasonName = reasonName;
        return this;
    }

    public void setReasonName(String reasonName) {
        this.reasonName = reasonName;
    }

    public Integer getStatus() {
        return status;
    }

    public Reason status(Integer status) {
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
        if (!(o instanceof Reason)) {
            return false;
        }
        return id != null && id.equals(((Reason) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reason{" +
            "id=" + getId() +
            ", descriptons='" + getDescriptons() + "'" +
            ", reasonName='" + getReasonName() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
