package br.com.ticktag.util;

import lombok.Getter;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.ExampleMatcher;

@UtilityClass
public class ExampleMatcherUtil {

    @Getter
    private final ExampleMatcher caseInsensitiveAndContainedExampleMatcher =
            ExampleMatcher.matching().withIgnoreCase().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

    @Getter
    private final ExampleMatcher caseInsensitiveExampleMatcher =
            ExampleMatcher.matching().withIgnoreCase();

    @Getter
    private final ExampleMatcher containedExampleMatcher =
            ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
//	ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("id") .withIgnoreCase();
}
