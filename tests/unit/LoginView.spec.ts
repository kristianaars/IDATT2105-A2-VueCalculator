import { mount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";
import store from "@/store";
import router from "@/router";
import AuthenticationService from "@/services/AccountService.js";

jest.mock("@/services/AccountService.ts");
jest.mock("@/router");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LoginView.vue", () => {
  it("Login with wrong credentials", async () => {
    AuthenticationService.authenticate = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          loginStatus: "Fail",
        },
      });
    });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.setData({ username: "user", password: "pass"})

    await wrapper.vm.submit().then(() => {
      expect(store.getters.loginState).toEqual(false);
      expect(store.getters.loggedInUser).toEqual("");
      expect(wrapper.find('[data-testid="error-message"]').text()).toEqual(
        "Wrong username or password..."
      );
    });
  });

  it("Login with correct credentials", async () => {
    AuthenticationService.authenticate = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: {
          loginStatus: "Success",
        },
      });
    });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.setData({ username: "user", password: "pass"})

    await wrapper.vm.submit().then(() => {
      expect(store.getters.loggedInUser).toEqual("user");
      expect(store.getters.loginState).toEqual(true);
      expect(router.push).toBeCalledTimes(1);
      expect(router.push).toBeCalledWith("/");
    });
  });


});
