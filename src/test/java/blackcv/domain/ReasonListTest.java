package blackcv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class ReasonListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReasonList.class);
        ReasonList reasonList1 = new ReasonList();
        reasonList1.setId(1L);
        ReasonList reasonList2 = new ReasonList();
        reasonList2.setId(reasonList1.getId());
        assertThat(reasonList1).isEqualTo(reasonList2);
        reasonList2.setId(2L);
        assertThat(reasonList1).isNotEqualTo(reasonList2);
        reasonList1.setId(null);
        assertThat(reasonList1).isNotEqualTo(reasonList2);
    }
}
