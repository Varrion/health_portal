package com.emt.health_portal.service;

import com.emt.health_portal.model.dto.ChargeRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

public interface StripeService {
    Charge charge(ChargeRequest chargeRequest) throws StripeException;
}
