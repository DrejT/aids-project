from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
import json

# use a different approach and use api endpoint instead of scraping
# just send a get request
# https://www.rottentomatoes.com/napi/movie/1f72f2e7-28cf-35bf-839e-577fd3f41ea3/reviews/top_critics?after=MZ%3D%3D&pageCount=40
# also change the after=M* instead of * place any letter
url = "https://www.rottentomatoes.com/m/deadpool_and_wolverine/reviews?type=top_critics"
driver = webdriver.Firefox()
file_name = "reviews.json"


def main():
    driver.get(url)
    try:
        while True:
            button = driver.find_element(
                By.CSS_SELECTOR, 'rt-button[data-qa="load-more-btn"]'
            )
            print()
            if button.is_displayed() and button.is_enabled():
                button.click()
                time.sleep(1)
            else:
                print("Button is hidden or disabled.")
    except Exception as e:
        print(e)
    finally:
        print("done")

    review_table = driver.find_element(By.CLASS_NAME, "review_table")
    reviews_list = [
        review.text
        for review in review_table.find_elements(By.CLASS_NAME, "review-text")
    ]
    d = {"reviews_list": reviews_list, "reviews_number": len(reviews_list)}
    print(d)
    # with open(file_name, "w") as f:
    #     json.dump(d, f, indent=4)

    # combined_text = " ".join(reviews_list)
    #
    # print(combined_text)
    #
    # driver.quit()


if __name__ == "__main__":
    main()
