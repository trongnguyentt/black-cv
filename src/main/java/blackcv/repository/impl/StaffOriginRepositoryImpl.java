package blackcv.repository.impl;

import blackcv.domain.StaffOrigin;
import blackcv.repository.custom.StaffOriginRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StaffOriginRepositoryImpl implements StaffOriginRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<StaffOrigin> search(MultiValueMap<String, String> queryParams, Pageable pageable) {
        Map<String, Object> values = new HashMap<>();
        if (queryParams.containsKey("login") && !queryParams.get("author").get(0).contains("ROLE_ADMIN")) {
            String sql = "select C from StaffOrigin C where C.status <> 0 and C.createdBy like :login";
            values.put("login", queryParams.get("login").get(0));
            sql += createWhereQuery(queryParams, values);
            sql += createOrderQuery(queryParams);
            Query query = entityManager.createQuery(sql, StaffOrigin.class);
            values.forEach(query::setParameter);
            query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
            query.setMaxResults(pageable.getPageSize());
            return query.getResultList();
        } else {
            String sql = "select C from StaffOrigin C where C.status <> 0 ";
            sql += createWhereQuery(queryParams, values);
            sql += createOrderQuery(queryParams);
            Query query = entityManager.createQuery(sql, StaffOrigin.class);
            values.forEach(query::setParameter);
            query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
            query.setMaxResults(pageable.getPageSize());
            return query.getResultList();
        }
    }

    @Override
    public Long countStaffOrigin(MultiValueMap<String, String> queryParams) {
        String sql = "select count(C) from StaffOrigin C where C.status <> 0";
        Map<String, Object> values = new HashMap<>();
        sql += createWhereQuery(queryParams, values);
        Query query = entityManager.createQuery(sql, Long.class);
        values.forEach(query::setParameter);
        return (Long) query.getSingleResult();
    }

    private String createWhereQuery(MultiValueMap<String, String> queryParams, Map<String, Object> values) {
        String sql = "";
        if (queryParams.containsKey("name")) {
//            sql += "and lower(C.name) like lower(:name)";
//            values.put("name", queryParams.get("name").get(0));

//            sql += "and (lower(C.name) like lower(:name) or lower(C.businessAreas) like lower(:name))";
            sql += "and lower(C.name) like lower(:name)";
            values.put("name", '%' + queryParams.get("name").get(0) + '%');
        }

        if (queryParams.containsKey("email")) {
            sql += "and lower(C.email) like lower(:email)";
            values.put("email", "%" + queryParams.get("email").get(0) + "%");
        }

        return sql;
    }

    private String createOrderQuery(MultiValueMap<String, String> queryParams) {
        String sql = "";
        if (queryParams.containsKey("sort")) {
            sql = " order by ";
            List<String> orderByList = queryParams.get("sort");
            for (String i : orderByList) {
                sql += "C." + i.replace(",", " ") + ", ";
            }
            sql = sql.substring(0, sql.lastIndexOf(","));
        }
        return sql;
    }
}
