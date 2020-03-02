package blackcv.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ReasonList.
 */
@Entity
@Table(name = "reason_list")
public class ReasonList extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_cv")
    private Integer idCV;

    @Column(name = "document")
    private String document;

    @Column(name = "id_reason")
    private Integer id_reason;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCV() {
        return idCV;
    }

    public ReasonList idCV(Integer idCV) {
        this.idCV = idCV;
        return this;
    }

    public void setIdCV(Integer idCV) {
        this.idCV = idCV;
    }

    public String getDocument() {
        return document;
    }

    public ReasonList document(String document) {
        this.document = document;
        return this;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public Integer getId_reason() {
        return id_reason;
    }

    public ReasonList id_reason(Integer id_reason) {
        this.id_reason = id_reason;
        return this;
    }

    public void setId_reason(Integer id_reason) {
        this.id_reason = id_reason;
    }

    public Integer getStatus() {
        return status;
    }

    public ReasonList status(Integer status) {
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
        if (!(o instanceof ReasonList)) {
            return false;
        }
        return id != null && id.equals(((ReasonList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReasonList{" +
            "id=" + getId() +
            ", idCV=" + getIdCV() +
            ", document='" + getDocument() + "'" +
            ", id_reason=" + getId_reason() +
            ", status=" + getStatus() +
            "}";
    }
}
