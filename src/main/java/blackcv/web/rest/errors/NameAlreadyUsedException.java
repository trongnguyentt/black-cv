package blackcv.web.rest.errors;

public class NameAlreadyUsedException extends BadRequestAlertException{

    private static final long serialVersionUID = 1L;

    public NameAlreadyUsedException() {
        super(ErrorConstants.COMPANY_ALREADY_USED_TYPE, "Company is already in use!", "companyManagement", "companyexists");
    }
}
