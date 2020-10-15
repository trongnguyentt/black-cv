package blackcv.repository.impl;

import blackcv.domain.ReasonList;
import blackcv.repository.custom.ReasonListRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReasonListRepositoryImpl implements ReasonListRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ReasonList> search(MultiValueMap<String, String> queryParams, Pageable pageable) {
        String sql = "select C from ReasonList C where C.status <> 0 ";
        Map<String, Object> values = new HashMap<>();
        sql += createWhereQuery(queryParams, values);
        sql += createOrderQuery(queryParams);
        Query query = entityManager.createQuery(sql, ReasonList.class);
        values.forEach(query::setParameter);
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        return query.getResultList();
    }

    @Override
    public Long countReasonList(MultiValueMap<String, String> queryParams) {
        String sql = "select count(C) from ReasonList C where C.status <> 0";
        Map<String, Object> values = new HashMap<>();
        sql += createWhereQuery(queryParams, values);
        Query query = entityManager.createQuery(sql, Long.class);
        values.forEach(query::setParameter);
        return (Long) query.getSingleResult();
    }

    private String createWhereQuery(MultiValueMap<String, String> queryParams, Map<String, Object> values) {
        String sql = "";

        if (queryParams.containsKey("cv")) {
//            sql += "and lower(C.name) like lower(:name)";
//            values.put("name", queryParams.get("name").get(0));

            sql += "and lower(C.idCV) like lower(:cv)";
            values.put("cv", '%' + queryParams.get("cv").get(0) + '%');
        }

        if (queryParams.containsKey("reason")) {
//            sql += "and lower(C.name) like lower(:name)";
//            values.put("name", queryParams.get("name").get(0));

            sql += "and lower(C.id_reason) like lower(:reason)";
            values.put("reason", '%' + queryParams.get("reason").get(0) + '%');
        }

//        if (queryParams.containsKey("countryName")) {
//            sql += "and lower(C.countryName) like lower(:countryName)";
//            values.put("countryName", "%" + queryParams.get("countryName").get(0) + "%");
//        }
        return sql;
    }

    private String createOrderQuery(MultiValueMap<String, String> queryParams) {
        String sql = " order by ";
        if (queryParams.containsKey("sort")) {
            List<String> orderByList = queryParams.get("sort");
            for (String i : orderByList) {
                sql += "C." + i.replace(",", " ") + ", ";
            }
            sql = sql.substring(0, sql.lastIndexOf(","));
        } else {
            sql += "C.createdDate desc";
        }
        return sql;
    }
}
