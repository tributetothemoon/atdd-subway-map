package wooteco.subway.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice(assignableTypes = {StationController.class})
public class StationControllerAdvice {

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<String> handleDuplicateUniqueColumnException(DuplicateKeyException exception) {
        return ResponseEntity.badRequest()
                .body("이미 존재하는 역 이름입니다.");
    }
}
