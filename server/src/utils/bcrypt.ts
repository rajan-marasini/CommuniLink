import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
};
