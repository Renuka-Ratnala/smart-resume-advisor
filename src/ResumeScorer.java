import java.util.HashMap;
import java.util.Map;

public class ResumeScorer {

    public int score(String resumeText, String jobText) {
        String[] jobKeywords = jobText.toLowerCase().split("\\s+");
        String resume = resumeText.toLowerCase();

        Map<String, Integer> keywordFrequency = new HashMap<>();
        int score = 0;

        for (String keyword : jobKeywords) {
            if (resume.contains(keyword)) {
                keywordFrequency.put(
                    keyword,
                    keywordFrequency.getOrDefault(keyword, 0) + 1
                );
                score++;
            }
        }
        return score;
    }
}
