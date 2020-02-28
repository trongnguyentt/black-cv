package blackcv.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link blackcv.domain.CV} entity.
 */
public class CVDTO implements Serializable {

    private Long id;

    private Integer idCompany;

    private String name;

    private String birthday;

    private String phone;

    private String email;

    private String address;

    private String job;

    private String gender;

    private String avatar;

    private String fileUploadCV;

    private Integer status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(Integer idCompany) {
        this.idCompany = idCompany;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getFileUploadCV() {
        return fileUploadCV;
    }

    public void setFileUploadCV(String fileUploadCV) {
        this.fileUploadCV = fileUploadCV;
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

        CVDTO cVDTO = (CVDTO) o;
        if (cVDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cVDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CVDTO{" +
            "id=" + getId() +
            ", idCompany=" + getIdCompany() +
            ", name='" + getName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", address='" + getAddress() + "'" +
            ", job='" + getJob() + "'" +
            ", gender='" + getGender() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", fileUploadCV='" + getFileUploadCV() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
