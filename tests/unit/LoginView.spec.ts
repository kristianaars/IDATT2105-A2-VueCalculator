import { mount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";
import store from "@/store";
import router from "@/router";
import AuthenticationService from "@/services/AuthenticationService.js";

jest.mock("@/services/AuthenticationService.js.ts");
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
      props: {
        username: "user",
        password: "pass",
      },
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.submit().then(() => {
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
      props: {
        username: "user",
        password: "pass",
      },
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.submit().then(() => {
      expect(router.push).toBeCalledTimes(1);
      expect(router.push).toBeCalledWith("/");
    });
  });
});
