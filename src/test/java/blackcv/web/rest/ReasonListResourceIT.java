package blackcv.web.rest;

import blackcv.BlackcvApp;
import blackcv.domain.ReasonList;
import blackcv.repository.ReasonListRepository;
import blackcv.service.ReasonListService;
import blackcv.service.dto.ReasonListDTO;
import blackcv.service.mapper.ReasonListMapper;
import blackcv.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static blackcv.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReasonListResource} REST controller.
 */
@SpringBootTest(classes = BlackcvApp.class)
public class ReasonListResourceIT {

    private static final Integer DEFAULT_ID_CV = 1;
    private static final Integer UPDATED_ID_CV = 2;

    private static final String DEFAULT_DOCUMENT = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_REASON = 1;
    private static final Integer UPDATED_ID_REASON = 2;

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private ReasonListRepository reasonListRepository;

    @Autowired
    private ReasonListMapper reasonListMapper;

    @Autowired
    private ReasonListService reasonListService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReasonListMockMvc;

    private ReasonList reasonList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReasonListResource reasonListResource = new ReasonListResource(reasonListService);
        this.restReasonListMockMvc = MockMvcBuilders.standaloneSetup(reasonListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReasonList createEntity(EntityManager em) {
        ReasonList reasonList = new ReasonList()
            .idCV(DEFAULT_ID_CV)
            .document(DEFAULT_DOCUMENT)
            .id_reason(DEFAULT_ID_REASON)
            .status(DEFAULT_STATUS);
        return reasonList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReasonList createUpdatedEntity(EntityManager em) {
        ReasonList reasonList = new ReasonList()
            .idCV(UPDATED_ID_CV)
            .document(UPDATED_DOCUMENT)
            .id_reason(UPDATED_ID_REASON)
            .status(UPDATED_STATUS);
        return reasonList;
    }

    @BeforeEach
    public void initTest() {
        reasonList = createEntity(em);
    }

    @Test
    @Transactional
    public void createReasonList() throws Exception {
        int databaseSizeBeforeCreate = reasonListRepository.findAll().size();

        // Create the ReasonList
        ReasonListDTO reasonListDTO = reasonListMapper.toDto(reasonList);
        restReasonListMockMvc.perform(post("/api/reason-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonListDTO)))
            .andExpect(status().isCreated());

        // Validate the ReasonList in the database
        List<ReasonList> reasonListList = reasonListRepository.findAll();
        assertThat(reasonListList).hasSize(databaseSizeBeforeCreate + 1);
        ReasonList testReasonList = reasonListList.get(reasonListList.size() - 1);
        assertThat(testReasonList.getIdCV()).isEqualTo(DEFAULT_ID_CV);
        assertThat(testReasonList.getDocument()).isEqualTo(DEFAULT_DOCUMENT);
        assertThat(testReasonList.getId_reason()).isEqualTo(DEFAULT_ID_REASON);
        assertThat(testReasonList.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createReasonListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reasonListRepository.findAll().size();

        // Create the ReasonList with an existing ID
        reasonList.setId(1L);
        ReasonListDTO reasonListDTO = reasonListMapper.toDto(reasonList);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReasonListMockMvc.perform(post("/api/reason-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReasonList in the database
        List<ReasonList> reasonListList = reasonListRepository.findAll();
        assertThat(reasonListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReasonLists() throws Exception {
        // Initialize the database
        reasonListRepository.saveAndFlush(reasonList);

        // Get all the reasonListList
        restReasonListMockMvc.perform(get("/api/reason-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reasonList.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCV").value(hasItem(DEFAULT_ID_CV)))
            .andExpect(jsonPath("$.[*].document").value(hasItem(DEFAULT_DOCUMENT)))
            .andExpect(jsonPath("$.[*].id_reason").value(hasItem(DEFAULT_ID_REASON)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getReasonList() throws Exception {
        // Initialize the database
        reasonListRepository.saveAndFlush(reasonList);

        // Get the reasonList
        restReasonListMockMvc.perform(get("/api/reason-lists/{id}", reasonList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reasonList.getId().intValue()))
            .andExpect(jsonPath("$.idCV").value(DEFAULT_ID_CV))
            .andExpect(jsonPath("$.document").value(DEFAULT_DOCUMENT))
            .andExpect(jsonPath("$.id_reason").value(DEFAULT_ID_REASON))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingReasonList() throws Exception {
        // Get the reasonList
        restReasonListMockMvc.perform(get("/api/reason-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReasonList() throws Exception {
        // Initialize the database
        reasonListRepository.saveAndFlush(reasonList);

        int databaseSizeBeforeUpdate = reasonListRepository.findAll().size();

        // Update the reasonList
        ReasonList updatedReasonList = reasonListRepository.findById(reasonList.getId()).get();
        // Disconnect from session so that the updates on updatedReasonList are not directly saved in db
        em.detach(updatedReasonList);
        updatedReasonList
            .idCV(UPDATED_ID_CV)
            .document(UPDATED_DOCUMENT)
            .id_reason(UPDATED_ID_REASON)
            .status(UPDATED_STATUS);
        ReasonListDTO reasonListDTO = reasonListMapper.toDto(updatedReasonList);

        restReasonListMockMvc.perform(put("/api/reason-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonListDTO)))
            .andExpect(status().isOk());

        // Validate the ReasonList in the database
        List<ReasonList> reasonListList = reasonListRepository.findAll();
        assertThat(reasonListList).hasSize(databaseSizeBeforeUpdate);
        ReasonList testReasonList = reasonListList.get(reasonListList.size() - 1);
        assertThat(testReasonList.getIdCV()).isEqualTo(UPDATED_ID_CV);
        assertThat(testReasonList.getDocument()).isEqualTo(UPDATED_DOCUMENT);
        assertThat(testReasonList.getId_reason()).isEqualTo(UPDATED_ID_REASON);
        assertThat(testReasonList.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingReasonList() throws Exception {
        int databaseSizeBeforeUpdate = reasonListRepository.findAll().size();

        // Create the ReasonList
        ReasonListDTO reasonListDTO = reasonListMapper.toDto(reasonList);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReasonListMockMvc.perform(put("/api/reason-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ReasonList in the database
        List<ReasonList> reasonListList = reasonListRepository.findAll();
        assertThat(reasonListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReasonList() throws Exception {
        // Initialize the database
        reasonListRepository.saveAndFlush(reasonList);

        int databaseSizeBeforeDelete = reasonListRepository.findAll().size();

        // Delete the reasonList
        restReasonListMockMvc.perform(delete("/api/reason-lists/{id}", reasonList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReasonList> reasonListList = reasonListRepository.findAll();
        assertThat(reasonListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
