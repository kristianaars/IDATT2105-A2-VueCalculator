import { mount } from "@vue/test-utils";
import store from "@/store";
import AccountService from "@/services/AccountService";
import RegisterView from "@/views/RegisterView.vue";

jest.mock("@/services/AccountService");
jest.mock("@/router");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("RegisterView.vue", () => {
  test("Successful register", async () => {
    AccountService.register = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          registerStatus: "Success",
        },
      });
    });

    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.submit().then(() => {
      expect(wrapper.find('[data-testid="success-message"]').text()).toEqual(
        "User successfully created!"
      );
      expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(
        false
      );
    });
  });

  test("Unsuccessful register", async () => {
    AccountService.register = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          registerStatus: "Error",
        },
      });
    });

    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.submit().then(() => {
      expect(wrapper.find('[data-testid="success-message"]').exists()).toBe(
        false
      );
      expect(wrapper.find('[data-testid="error-message"]').text()).toEqual(
        "Error creating user."
      );
    });
  });
});
