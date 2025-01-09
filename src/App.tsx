import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import validator from "validator";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import "./App.css";

type Inputs = {
  url: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [domainDetails, setDomainDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>();

  const submitHandler = async (data: Inputs) => {
    setIsLoading(true);
    const response = await axios.post("http://127.0.0.1:3000/lookup", {
      url: data.url,
    });
    setIsLoading(false);
    setDomainDetails(response.data);
  };

  const onSubmit: SubmitHandler<Inputs> = submitHandler;

  return (
    <div className="body">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div>
            <input
              type="text"
              id="inputText"
              placeholder="Enter domain here"
              {...register("url", {
                required: true,
                validate: (value) => validator.isURL(value),
              })}
            />
            {errors.url && <span>Not a valid domain</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
        {isLoading ? (
          <div style={{ marginTop: 20 }}>
            <ThreeDot
              variant="pulsate"
              color="#e69514"
              size="medium"
              text=""
              textColor=""
            />
          </div>
        ) : (
          <div className={domainDetails !== "" ? "contain" : ""}>
            {domainDetails !== "" ? JSON.stringify(domainDetails) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
