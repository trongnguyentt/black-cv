package blackcv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class ReasonTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reason.class);
        Reason reason1 = new Reason();
        reason1.setId(1L);
        Reason reason2 = new Reason();
        reason2.setId(reason1.getId());
        assertThat(reason1).isEqualTo(reason2);
        reason2.setId(2L);
        assertThat(reason1).isNotEqualTo(reason2);
        reason1.setId(null);
        assertThat(reason1).isNotEqualTo(reason2);
    }
}
